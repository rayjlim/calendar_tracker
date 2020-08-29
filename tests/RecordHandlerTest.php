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
        $request = $this->createMock('Psr\Http\Message\ServerRequestInterface');
        $request->method('getParsedBody')->willReturn([
            "date"=> "2020-08-29",
            "count"=> "20",
            "comment"=> "new comment",
            "goalId"=>"10"
        ]);

        $orm = $this->createMock('\Tracker\LogsRedbeanDAO');
        $orm
            // ->expects($this->once())
            ->method('insert')
            ->with(10, '2020-08-29', 20, 'new comment')
            ->willReturn(json_decode('{"id":101}'));

        $mockBody = $this->createMock('Psr\Http\Message\StreamInterface');
        $mockBody->method('write')
            ->with($this->equalTo('{"success":true,"record":{"id":101}}'));
        $response = $this->createStub('Psr\Http\Message\ResponseInterface');
        $response->method('getBody')
             ->willReturn($mockBody);

        $record = new RecordHandler($orm);
        $record->store($request, $response, []);
    }

    public function testCanUpdateARecord()
    {
        $request = $this->createMock('Psr\Http\Message\ServerRequestInterface');
        $request->method('getParsedBody')->willReturn([
            "date"=> "2020-08-29",
            "count"=> "20",
            "comment"=> "new comment",
            "goalId"=>"10"
        ]);

        $orm = $this->createMock('\Tracker\LogsRedbeanDAO');
        $orm
            // ->expects($this->once())
            ->method('update')
            ->with(10, '2020-08-29', 20, 'new comment', 1)
            ->willReturn(json_decode('{"id":101}'));

        $mockBody = $this->createMock('Psr\Http\Message\StreamInterface');
        $mockBody->method('write')
            ->with($this->equalTo('{"success":true,"record":{"id":101}}'));

        $response = $this->createStub('Psr\Http\Message\ResponseInterface');
        $response->method('getBody')
             ->willReturn($mockBody);
        $args = ['id'=> 1];
        $record = new RecordHandler($orm);
        $record->update($request, $response, $args);
        

        // $this->assertNotNull($result);
        // $this->assertEquals($result, 'foo2');
    }
}
