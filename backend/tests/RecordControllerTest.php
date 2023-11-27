<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class RecordControllerTest extends TestCase
{
    /**
     * Test list default
     *
     * @return void
     */
    // public function test_list_base_path()
    // {
    //     // $recordMock = Mockery::mock(Record::class);
    //     // $recordMock->shouldReceive('where')
    //     // ->andReturn([]);
    //     $this->get('/record/');

    //     $this->seeStatusCode(200);
    //     $this->seeJsonStructure(
    //         [
    //             'data' => [
    //                 '*' => [
    //                     'id',
    //                     'goal',
    //                     'points',
    //                     'date',
    //                     'count',
    //                     'comment'
    //                 ]
    //             ],
    //             'params' => ['goal', 'start', 'end']

    //         ]
    //     );
    // }

    // /**
    //  * Test list default
    //  *
    //  * @return void
    //  */
    // public function test_list_custom_goal()
    // {
    //     $this->get('/record/?goal=sleep');
    //     $response = $this->response->getContent();
    //     $targetValue = json_decode($response);
    //     $this->assertEquals(
    //         'sleep', $targetValue->params->goal
    //     );
    // }


    /**
     * Test list default
     *
     * @return void
     */
    // public function test_add_record()
    // {
    //     $this->post('/record/');
    //     $response = $this->response->getContent();
    //     $targetValue = json_decode($response);
    //     $this->assertEquals(
    //         'sleep', $targetValue->params->goal
    //     );
    // }
}
