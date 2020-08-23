<?php

namespace tracker;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class RecordHandler
{
    public $hasOrm = false;
    private $ORM = null;

    public function __construct($ORM = null)
    {
        echo "RecordHandler construct<br>";
        // parent::__construct($app);
        if ($ORM != null) {
            // "use Injected ORM<br>";
            $this->hasOrm = true;
            $this->ORM = $ORM;
        }else{
            // use Factory ORM
            $this->ORM = new \tracker\ORM(); 
        }
    }
    public function store(Request $request, Response $response, $args)
    {
        $message = "Hello store it!" . $args['id'];
        $response->getBody()->write($message);
        $this->ORM->save($args['id'], 2, 'weight');
        return $response;
    }
}
