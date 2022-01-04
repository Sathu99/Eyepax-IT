<?php

namespace App\Tests;

use App\Tests\ApiTester;
use Symfony\Component\HttpFoundation\Response;

class CrudCtrlCest
{
    public function _before(ApiTester $I)
    {
    }

    // tests

    /**
     * @param \App\Tests\ApiTester $I
     * @return void
     */
    public function getAllRepsTest(ApiTester $I)
    {
        $I->sendGet('/api/team/getall');
        $I->seeResponseCodeIs(Response::HTTP_OK);
        $I->seeResponseIsJson();
        $I->seeResponseMatchesJsonType([
            'id' => 'integer',
            'name' => 'string',
            'email' => 'string:email',
            'telephone' => 'string',
            'route' => 'string',
            'joinedDate' => 'string:date',
            'comment' => 'string|null'
        ]);
    }

    // tests

    /**
     * @param \App\Tests\ApiTester $I
     * @return void
     */
    public function createRepTest(ApiTester $I)
    {
        $I->sendPostAsJson('/api/team/add', ['name' => 'kamal', 'email' => 'test1@gmail.com', "telephone" => "0758745423", "route" => "kandy", "joinedDate" => "2022-8-25", "comment" => "createTest"]);
        $I->seeResponseCodeIs(Response::HTTP_OK);
        $I->seeResponseIsJson();
    }

    // tests

    /**
     * @param \App\Tests\ApiTester $I
     * @return void
     */
    public function createRepTestErr_1(ApiTester $I)
    {
        $I->sendPostAsJson('/api/team/add', ['name' => 'kamal', 'email' => 'apitest@gmail.com', "telephone" => "0758745423", "route" => "kandy", "joinedDate" => "2022-8-25", "comment" => "createTest"]);
        $I->seeResponseCodeIs(Response::HTTP_ALREADY_REPORTED);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'type' => 'error',
            'message' => 'This Email Address is already exit.',
        ]);
    }


    // tests

    /**
     * @param \App\Tests\ApiTester $I
     * @return void
     */
    public function createRepTestErr_2(ApiTester $I)
    {
        $I->sendPostAsJson('/api/team/add', ['name' => 'kamal', 'email' => 'apitestgmailcom', "telephone" => "075890745423", "route" => "kandy", "joinedDate" => "2022-8-25", "comment" => "createTest"]);
        $I->seeResponseCodeIs(Response::HTTP_UNPROCESSABLE_ENTITY);
        $I->seeResponseIsJson();
    }

    // tests

    /**
     * @param \App\Tests\ApiTester $I
     * @return void
     */
    public function updateRepsTest(ApiTester $I)
    {
        $I->sendPutAsJson('/api/team/update/1', ['name' => 'kamal', 'email' => 'test1@gmail.com', "telephone" => "0758745423", "route" => "kandy", "joinedDate" => "2022-8-25", "comment" => "createTest"]);
        $I->seeResponseCodeIs(Response::HTTP_OK);
        $I->seeResponseIsJson();
    }

    // tests

    /**
     * @param \App\Tests\ApiTester $I
     * @return void
     */
    public function updateRepTestErr_1(ApiTester $I)
    {
        $I->sendPutAsJson('/api/team/update/5', ['name' => 'kamal', 'email' => 'test1@gmail.com', "telephone" => "0758745423", "route" => "kandy", "joinedDate" => "2022-8-25", "comment" => "createTest"]);
        $I->seeResponseCodeIs(Response::HTTP_NOT_FOUND);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'type' => 'error',
            'msg' => 'There is no any user exit with this ID.'
        ]);
    }

    // tests

    /**
     * @param \App\Tests\ApiTester $I
     * @return void
     */
    public function viewRepTest(ApiTester $I)
    {
        $I->sendGet('/api/team/view/1');
        $I->seeResponseCodeIs(Response::HTTP_OK);
        $I->seeResponseIsJson();
        $I->seeResponseMatchesJsonType([
            'id' => 'integer',
            'name' => 'string',
            'email' => 'string:email',
            'telephone' => 'string',
            'route' => 'string',
            'joinedDate' => 'string:date',
            'comment' => 'string|null'
        ]);
    }

    // tests

    /**
     * @param \App\Tests\ApiTester $I
     * @return void
     */
    public function viewRepTestErr_1(ApiTester $I)
    {
        $I->sendGet('/api/team/view/5');
        $I->seeResponseCodeIs(Response::HTTP_NOT_FOUND);
        $I->seeResponseIsJson();
        $I->seeResponseMatchesJsonType([
            'type' => 'string',
            'msg' => 'string',
        ]);
    }

    // tests

    /**
     * @param \App\Tests\ApiTester $I
     * @return void
     */
    public function deleteRepTest(ApiTester $I)
    {
        $I->sendDelete('/api/team/delete/1');
        $I->seeResponseCodeIs(Response::HTTP_OK);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'type' => 'success',
            'message' => 'User successfully removed'
        ]);
    }

    // tests

    /**
     * @param \App\Tests\ApiTester $I
     * @return void
     */
    public function deleteRepTestErr_1(ApiTester $I)
    {
        $I->sendDelete('/api/team/delete/6');
        $I->seeResponseCodeIs(Response::HTTP_NOT_FOUND);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'type' => 'error',
            'msg' => 'There is no any user exit with this ID.'
        ]);
    }

}
