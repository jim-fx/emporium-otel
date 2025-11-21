# Notes

## Setting up filelog receiver with docker

Its a bit tricky to add the `container.name` to the filelogs that docker saves under `/var/lib/docker/[id]/[id].log`

For that we need to add the following to `/etc/docker/daemon.json`:




