# Notes

## Setting up filelog receiver with docker

Its a bit tricky to add the `container.name` to the filelogs that docker saves under `/var/lib/docker/[id]/[id].log`

For that we need to add the following to `/etc/docker/daemon.json`:

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "tag": "{{.Name}}|{{.ImageName}}|{{.ID}}"
  }
}
```

> Note: After adding it we need to recreate the containers

Then we can parse those tags with those slightly complicated looking `filelog` receiver:

```yaml
filelog/docker:
  include:
    - /var/lib/docker/containers/*/*-json.log
  start_at: end
  include_file_path: false
  include_file_name: false
  poll_interval: 200ms
  operators:
    - id: docker-parser
      type: container
      format: docker
      add_metadata_from_filepath: false

    - id: docker-tag-split
      type: regex_parser
      if: 'attributes["attrs"] != nil && attributes["attrs"]["tag"] != nil'
      parse_from: attributes["attrs"]["tag"]
      regex: '^(?P<container_name>[^|]+)\|(?P<container_image>[^|]+)\|(?P<container_id>[^|]+)$'

    - id: copy-container-id
      type: copy
      if: 'attributes["container_name"] != nil'
      from: attributes["container_name"]
      to: resource["service.name"]

    - id: move-service-name
      type: move
      if: 'attributes["container_name"] != nil'
      from: attributes["container_name"]
      to: resource["docker.container_name"]

    - id: move-image-name
      type: move
      if: 'attributes["container_image"] != nil'
      from: attributes["container_image"]
      to: resource["docker.image.name"]

    - id: move-container-id
      type: move
      if: 'attributes["container_id"] != nil'
      from: attributes["container_id"]
      to: resource["docker.container_id"]

    - id: drop-attrs-tag
      type: remove
      if: 'attributes["attrs"] != nil && attributes["attrs"]["tag"] != nil'
      field: attributes["attrs"]["tag"]
```
