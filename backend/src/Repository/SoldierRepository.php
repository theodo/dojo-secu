<?php

namespace App\Repository;

use App\Entity\Soldier;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Soldier|null find($id, $lockMode = null, $lockVersion = null)
 * @method Soldier|null findOneBy(array $criteria, array $orderBy = null)
 * @method Soldier[]    findAll()
 * @method Soldier[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SoldierRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Soldier::class);
    }

    public function dangerouslySearchByRank(string $rank): array
    {
        return $this->createQueryBuilder('u')
            ->where('u.rank ='.$rank)
            ->getQuery()
            ->getResult(Query::HYDRATE_ARRAY);
    }
}
