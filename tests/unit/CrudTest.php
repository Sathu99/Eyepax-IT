<?php

namespace App\Tests;

use App\Entity\SalesReps;
use Symfony\Component\Validator\Validation;

/**
 *
 */
class CrudTest extends \Codeception\Test\Unit
{
    /**
     * @var \App\Tests\UnitTester
     */
    protected $tester;
    private $validator;

    /**
     * @return void
     */
    protected function _before()
    {
        $this->validator = Validation::createValidatorBuilder()->enableAnnotationMapping()->getValidator();
    }

    /**
     * @return void
     */
    protected function _after()
    {
    }

    // tests

    /**
     * @return void
     */
    public function testCreateReps()
    {   //here all fields are valid
        $representative = new SalesReps('Sathulakjan', 'test@gmail.com', '0775896423', 'colombo', date_create('2020-10-26'), '');

        $errors = $this->validator->validate($representative);
        $this->tester->assertEquals(count($errors), 0);
    }

    /**
     * @return void
     */
    public function testCreateRepsErrors()
    {   //here email and telephone number are invalid
        $representative = new SalesReps('Sathulakjan', 'testgmail.com', '077578896423', 'colombo', date_create('2020-6-26'), '');

        $errors = $this->validator->validate($representative);
        $this->tester->assertGreaterThanOrEqual(1, count($errors),);
    }

    /**
     * @return void
     */
    public function testClassProperties()
    {   //here all properties are checked
        $this->tester->assertClassHasAttribute('id', SalesReps::class, "Check ID Property");
        $this->tester->assertClassHasAttribute('email', SalesReps::class, "Check email Property");
        $this->tester->assertClassHasAttribute('name', SalesReps::class, "Check name Property");
        $this->tester->assertClassHasAttribute('telephone', SalesReps::class, "Check telephone Property");
        $this->tester->assertClassHasAttribute('joinedDate', SalesReps::class, "Check joinedDate Property");
        $this->tester->assertClassHasAttribute('comment', SalesReps::class, "Check comment Property");
    }
}