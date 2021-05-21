<?php

namespace App\Repository;

use App\Entity\Soldier;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Soldier|null find($id, $lockMode = null, $lockVersion = null)
 * @method Soldier|null findOneBy(array $criteria, array $orderBy = null)
 * @method Soldier[]    findAll()
 * @method Soldier[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SoldierRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Soldier::class);
    }

    public function dangerouslySearchByRank(string $rank): array
    {
        return $this->createQueryBuilder('u')
            ->select('u.firstName, u.lastName')
            ->where('u.rank ='.$rank)
            ->getQuery()
            ->getResult(Query::HYDRATE_ARRAY);
    }
}
