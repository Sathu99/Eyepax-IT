<?php

namespace App\Controller;

use FOS\RestBundle\Controller\AbstractFOSRestController;
use Symfony\Component\HttpFoundation\Response;

/**
 *
 */
abstract class AbstractApiController extends AbstractFOSRestController
{

    /**
     * @param $data
     * @param int $statusCode
     * @return Response
     */
    protected function respond($data, int $statusCode = Response::HTTP_OK): Response
    {
        return $this->handleView($this->view($data, $statusCode));
    }
}



