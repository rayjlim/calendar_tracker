<?php
use \Tracker\RecordHandler;

class RecordHandlerTest extends \Codeception\Test\Unit
{

    protected function _before()
    {
    }

    protected function _after()
    {
    }

    // tests
    public function testCanStoreNewRecord()
    {
        $fakeEntry = json_decode('{"id":101}');
        
        $orm = $this->createMock('\Tracker\LogsRedbeanDAO');
        $orm->method('insert')
            ->with(1, '2020-08-01', 2, 'comment about weight')
            ->willReturn($fakeEntry);

        $request = $this->createMock('Psr\Http\Message\ServerRequestInterface');

        $mockBody = $this->createMock('Psr\Http\Message\StreamInterface');
        $mockBody->method('write')
            ->with($this->equalTo('Hello store it!1new id 101'));

        $response = $this->createStub('Psr\Http\Message\ResponseInterface');
        $response->method('getBody')
             ->willReturn($mockBody);
        $args = ['id'=> 1];
        $record = new RecordHandler($orm);
        $record->store($request, $response, $args);

        // $this->assertNotNull($result);
        // $this->assertEquals($result, 'foo2');
    }
}
