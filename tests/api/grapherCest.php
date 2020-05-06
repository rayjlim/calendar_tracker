<?php 

class grapherCest
{
    public function _before(ApiTester $I)
    {
    }

   

    // tests
    public function createUserViaAPI(\ApiTester $I)
    {
        // $I->amHttpAuthenticated('service_user', '123456');
        $I->haveHttpHeader('Content-Type', 'application/x-www-form-urlencoded');
        $I->sendGET('/api/logs/?goal=weight');
        $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK); // 200
        $I->seeResponseIsJson();
        // $I->seeResponseContains('{"result":"ok"}');
        
    }
}
