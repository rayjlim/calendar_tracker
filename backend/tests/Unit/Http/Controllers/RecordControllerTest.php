<?php
// Issue, test is hitting the dataase
// instead of using testing local data.
namespace Tests\Unit\Http\Controllers;

use \TestCase;
use App\Models\Record;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Http\Controllers\RecordController;
use Illuminate\Http\Request;

class RecordControllerTest extends TestCase
{
    // use RefreshDatabase;

    protected $controller;

    protected function setUp(): void
    {
        parent::setUp();
        $this->controller = new RecordController();
    }

    // public function testList()
    // {
    //     // Create test records
    //     Record::factory()->create([
    //         'goal' => 'weight',
    //         'date' => '2023-05-15',
    //         'count' => 70.5,
    //         'comment' => 'test record'
    //     ]);

    //     $request = new Request([
    //         'goal' => 'weight',
    //         'start' => '2023-01-01',
    //         'end' => '2023-12-31'
    //     ]);

    //     $response = $this->controller->list($request);
    //     $result = json_decode($response, true);

    //     $this->assertArrayHasKey('data', $result);
    //     $this->assertArrayHasKey('params', $result);
    //     $this->assertCount(1, $result['data']);
    // }

    // public function testAdd()
    // {
    //     $request = new Request([
    //         'goal' => 'weight',
    //         'date' => '2023-05-15',
    //         'count' => 70.5,
    //         'comment' => 'test record'
    //     ]);

    //     $response = $this->controller->add($request);
    //     $result = json_decode($response, true);

    //     $this->assertTrue($result['success']);
    //     $this->assertDatabaseHas('cpc_logs', [
    //         'goal' => 'weight',
    //         'date' => '2023-05-15',
    //         'count' => 70.5,
    //     ]);
    // }

    // public function testRemove()
    // {
    //     $record = Record::factory()->create();

    //     $response = $this->controller->remove($record->id);
    //     $result = json_decode($response, true);

    //     $this->assertTrue($result['success']);
    //     $this->assertDatabaseMissing('cpc_logs', ['id' => $record->id]);
    // }

    // public function testOnThisDay()
    // {
    //     Record::factory()->create([
    //         'goal' => 'weight',
    //         'date' => '2023-05-15',
    //         'count' => 70.5,
    //     ]);

    //     $request = new Request([
    //         'month' => '05',
    //         'day' => '15'
    //     ]);

    //     $response = $this->controller->onThisDay($request);
    //     $result = json_decode($response, true);

    //     $this->assertIsArray($result);
    //     $this->assertCount(1, $result);
    //     $this->assertEquals('2023-05-15', $result[0]['date']);
    // }

    // public function testYearLogs()
    // {
    //     Record::factory()->create([
    //         'goal' => 'weight',
    //         'date' => '2023-05-15',
    //     ]);

    //     $request = new Request([
    //         'year' => '2023'
    //     ]);

    //     $response = $this->controller->yearLogs($request);
    //     $result = json_decode($response, true);

    //     $this->assertIsArray($result);
    //     $this->assertCount(1, $result);
    //     $this->assertEquals('2023-05-15', $result[0]['date']);
    // }

    public function testListWithDefaultParams()
    {
        $request = new Request();
        $response = $this->controller->list($request);
        $result = json_decode($response, true);

        $this->assertArrayHasKey('params', $result);
        $this->assertEquals('weight', $result['params']['goal']);
    }

    public function testOnThisDayWithDefaultParams()
    {
        $request = new Request();
        $response = $this->controller->onThisDay($request);
        $result = json_decode($response, true);

        $this->assertIsArray($result);
    }
}
