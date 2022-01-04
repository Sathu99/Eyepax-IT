<?php

namespace App\DataFixtures;

use App\Entity\SalesReps;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

/**
 *
 */
class AppFixtures extends Fixture
{
    /**
     * @param \Doctrine\Persistence\ObjectManager $manager
     * @return void
     */
    public function load(ObjectManager $manager): void
    {
        $representative = new SalesReps('Sathulakjan', 'apitest@gmail.com', '0775896423', 'colombo', date_create('2020-10-26'), 'test');

        $manager->persist($representative);
        $manager->flush();
    }
}
