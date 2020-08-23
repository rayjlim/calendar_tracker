<?php 
use Codeception\Stub\Expected;
use \tracker\RecordHandler;

class RecordHandlerTest extends \Codeception\Test\Unit
{

    protected function _before()
    {
    }

    protected function _after()
    {
    }

    // tests
    public function testHasOrm()
    {
        $orm = new stdClass;
        $record = new RecordHandler($orm);
        $this->assertTrue($record->hasOrm);
    }

    // tests
    public function testCallsOrm()
    {
        $orm = $this->createMock('\tracker\ORM');
        $orm->method('save')
            ->with(1, 2, 'weight');

        $record = new RecordHandler($orm);
        $request = $this->createMock('Psr\Http\Message\ServerRequestInterface');

        $mockBody = $this->createMock('Psr\Http\Message\StreamInterface');
        $mockBody->method('write')
            ->with($this->equalTo('Hello store it!1'));

        $response = $this->createStub('Psr\Http\Message\ResponseInterface');
        $response->method('getBody')
             ->willReturn($mockBody);
        $args = ['id'=> 1];


        $result = $record->store($request, $response, $args);
        $this->assertTrue($record->hasOrm);
        // $this->assertNotNull($result);
        // $this->assertEquals($result, 'foo2');

   
    }
}
