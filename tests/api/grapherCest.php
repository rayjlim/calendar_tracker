<?php 

class grapherCest
{
    public function _before(ApiTester $I)
    {
    }

    // tests
    public function shouldReturnEntriesForWeightGoal(\ApiTester $I)
    {
        // $I->amHttpAuthenticated('service_user', '123456');
        $I->haveHttpHeader('Content-Type', 'application/x-www-form-urlencoded');
        $I->sendGET('/api/logs/?goal=weight');
        $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
        $I->seeResponseIsJson();
        $I->seeResponseContains('
{"params":{"goal":"weight","start":"2020-03-22","end":"2020-05-22"},"logs":[{"id":"31","goal":"weight","points":"1","date":"2020-04-24","count":"144","comment":"test"},{"id":"15","goal":"weight","points":"1","date":"2020-04-25","count":"145","comment":""}]}');
            
        }
    }
