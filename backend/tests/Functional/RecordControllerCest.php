<?php

namespace Tests\Functional;

use Tests\Support\FunctionalTester;

class RecordControllerCest
{
    public function _before(FunctionalTester $I)
    {
        $I->haveInDatabase('cpc_logs', [
            'goal' => 'weight',
            'date' => '2023-05-15',
            'count' => 70.5,
            'comment' => 'test record'
        ]);
    }

    public function listRecordsTest(FunctionalTester $I)
    {
        $I->sendGET('/record', [
            'goal' => 'weight',
            'start' => '2023-01-01',
            'end' => '2023-12-31'
        ]);
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        // $I->seeResponseContainsJson(['data' => true]);
        $I->seeInDatabase('cpc_logs', ['goal' => 'weight']);
    }

    public function addRecordTest(FunctionalTester $I)
    {
        $I->sendPOST('/record', [
            'goal' => 'weight',
            'date' => '2023-05-16',
            'count' => 71.5,
            'comment' => 'new test record'
        ]);
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson(['success' => true]);
        $I->seeInDatabase('cpc_logs', [
            'goal' => 'weight',
            'date' => '2023-05-16'
        ]);
    }

    // public function removeRecordTest(FunctionalTester $I)
    // {
    //     $record = $I->grabFromDatabase('cpc_logs', 'id', ['date' => '2023-05-15']);
    //     $I->sendDELETE("/record/{$record}");
    //     $I->seeResponseCodeIs(200);
    //     $I->seeResponseIsJson();
    //     $I->seeResponseContainsJson(['success' => true]);
    //     $I->dontSeeInDatabase('cpc_logs', ['id' => $record]);
    // }

    public function onThisDayTest(FunctionalTester $I)
    {
        $I->sendGET('/onThisDay', [
            'month' => '05',
            'day' => '15'
        ]);
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeInDatabase('cpc_logs', [
            'date' => '2023-05-15'
        ]);
    }

    public function yearLogsTest(FunctionalTester $I)
    {
        $I->sendGET('/yearLogs', [
            'year' => '2023'
        ]);
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeInDatabase('cpc_logs', [
            'date' => '2023-05-15'
        ]);
    }

    public function listWithDefaultParamsTest(FunctionalTester $I)
    {
        $I->sendGET('/record');
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson(['params' => ['goal' => 'weight']]);
    }

    public function onThisDayWithDefaultParamsTest(FunctionalTester $I)
    {
        $I->sendGET('/onThisDay');
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
    }
}
