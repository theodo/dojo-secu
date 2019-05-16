<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource
 * @ORM\Table(name="army")
 * @ORM\Entity(repositoryClass="App\Repository\SoldierRepository")
 */
class Soldier
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"soldiers_read"})
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(type="string")
     * @Groups({"soldiers_read"})
     */
    private $firstName;

    /**
     * @var string
     * @ORM\Column(type="string")
     * @Groups({"soldiers_read"})
     */
    private $lastName;

    /**
     * @var string
     * @ORM\Column(type="string")
     * @Groups({"soldiers_read"})
     */
    private $rank;

    /**
     * @var string
     * @ORM\Column(type="string")
     */
    private $accessCode;

    public function getId(): ?int
    {
        return $this->id;
    }
    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;
        return $this;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;
        return $this;
    }

    public function getRank(): string
    {
        return $this->rank;
    }

    public function setRank(string $rank): self
    {
        $this->rank = $rank;
        return $this;
    }

    public function getAccessCode(): string
    {
        return $this->accessCode;
    }

    public function setAccessCode(string $accessCode): self
    {
        $this->accessCode = $accessCode;
        return $this;
    }
}
