<?php

namespace App\Repository;

use App\Entity\Message;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Message|null find($id, $lockMode = null, $lockVersion = null)
 * @method Message|null findOneBy(array $criteria, array $orderBy = null)
 * @method Message[]    findAll()
 * @method Message[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MessageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Message::class);
    }

     /**
      * @return Message[] Returns an array of Message objects
      */
    public function findByUser($user)
    {
        return $this->createQueryBuilder('message')
            ->leftJoin('message.chat', 'chat')
            ->leftJoin('message.author', 'author')
            ->select('author.email, message.text, message.createdAt')
            ->andWhere('chat.chatUser = :user')
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult()
        ;
    }

     /**
      * @return Message[] Returns an array of Message objects
      */
    public function findByChat($chatId)
    {
        return $this->createQueryBuilder('message')
            ->leftJoin('message.chat', 'chat')
            ->leftJoin('message.author', 'author')
            ->select('author.email, message.text, message.createdAt')
            ->andWhere('chat.id = :chatId')
            ->setParameter('chatId', $chatId)
            ->getQuery()
            ->getResult()
        ;
    }

    /*
    public function findOneBySomeField($value): ?Message
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
