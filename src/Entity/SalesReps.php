<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SalesRepsRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=SalesRepsRepository::class)
 */
//#[ApiResource]
class SalesReps
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Assert\Type(type="integer",message="This Value should be of type {{type}}")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     * @Assert\NotBlank(allowNull=false,message="This value should not be blank.")
     * @Assert\Length(max="100",min="5",allowEmptyString="false")
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=150,unique=true)
     * @Assert\Email(message="This email address is not valid")
     */
    private $email;


    /**
     * @ORM\Column(type="string", length=10)
     * @Assert\Length(min="10",max="10",allowEmptyString = false)
     */
    private $telephone;

    /**
     * @ORM\Column(type="string", length=100)
     * @Assert\NotBlank(allowNull=false,message="This value should not be blank.")
     * @Assert\Length(max="50",min="5",allowEmptyString=false)
     */
    private $route;

    /**
     * @ORM\Column(type="date")
     * @Assert\Date()
     * @var \DateTime A "Y-m-d" formatted value
     */
    private $joinedDate;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Assert\Length(max="255",allowEmptyString=true)
     *
     */
    private $comment;

    /**
     * @param $name
     * @param $email
     * @param $telephone
     * @param $route
     * @param \DateTime $joinedDate
     * @param $comment
     */
    public function __construct($name, $email, $telephone, $route, \DateTime $joinedDate, $comment)
    {
        $this->name = $name;
        $this->email = $email;
        $this->telephone = $telephone;
        $this->route = $route;
        $this->joinedDate = $joinedDate;
        $this->comment = $comment;
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(string $telephone): self
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getRoute(): ?string
    {
        return $this->route;
    }

    public function setRoute(string $route): self
    {
        $this->route = $route;

        return $this;
    }

    public function getJoinedDate(): ?\DateTime
    {
        return $this->joinedDate;
    }

    public function setJoinedDate(\DateTime $joinedDate): self
    {
        $this->joinedDate = $joinedDate;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

}
