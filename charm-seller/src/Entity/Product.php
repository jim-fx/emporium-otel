<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ORM\Table(name: '`products`')]
class Product
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(['product:read'])]
    private ?Uuid $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 50)]
    #[Groups(['product:read'])]
    private ?string $type = null;

    #[ORM\Column(length: 50)]
    #[Groups(['product:read'])]
    private ?string $rarity = null;

    #[ORM\Column]
    #[Groups(['product:read'])]
    private ?int $price = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product:read'])]
    private ?string $image = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['product:read'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['product:read'])]
    private ?int $quantity = null;

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function getRarity(): ?string
    {
        return $this->rarity;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function getQuantity():?int
    {
        return $this->quantity;
    }
}
