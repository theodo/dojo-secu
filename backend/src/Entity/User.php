<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource
 * @ORM\Table(name="app_users")
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User implements UserInterface
{
    public const ROLES = [
        'level_one' => '55c3ee46d0eebd1ad5392a02cf48830df0ab6901',
        'level_two' => 'a59ca43c08454e124ed252830b811dd63649e62a',
        'level_three' => '370315690cfb42749c656c302369ce14291e1380',
        'level_four' => 'deba90042e6610e4a87d4d6711f61f774a1808b0',
    ];

    public const ROLES_NAMES = [
        'level_one' => 'ROLE_CLONE',
        'level_two' => 'ROLE_TROOPER',
        'level_three' => 'ROLE_SQUAD_LEADER',
        'level_four' => 'ROLE_CORPORAL',
    ];

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=320, unique=true)
     * @Groups({"users_read"})
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups({"users_read"})
     */
    private $roles = [self::ROLES['level_one']];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): string
    {
        return (string) $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return $this->getEmail();
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_MINION
        $roles[] = self::ROLES['level_one'];

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function addRole(string $roleLevel): void
    {
        array_push($this->roles, self::ROLES[$roleLevel]);
    }

    public function resetRoles(): void
    {
        $this->roles = [self::ROLES['level_one']];
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }
}
