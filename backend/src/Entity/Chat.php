<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ChatRepository")
 */
class Chat
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\User", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $chatUser;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getChatUser(): ?User
    {
        return $this->chatUser;
    }

    public function setChatUser(User $chatUser): self
    {
        $this->chatUser = $chatUser;

        return $this;
    }
}
