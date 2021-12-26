<?php

namespace App\Repository;

use App\Entity\SalesReps;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method SalesReps|null find($id, $lockMode = null, $lockVersion = null)
 * @method SalesReps|null findOneBy(array $criteria, array $orderBy = null)
 * @method SalesReps[]    findAll()
 * @method SalesReps[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SalesRepsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SalesReps::class);
    }

    // /**
    //  * @return SalesReps[] Returns an array of SalesReps objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?SalesReps
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
