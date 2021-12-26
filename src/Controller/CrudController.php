<?php

namespace App\Controller;

use App\Entity\SalesReps;
use App\Form\SalesRepType;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/team", name="team_api.")
 */
class CrudController extends AbstractApiController
{
    /**
     * @Route("/view/{id<\d+>}", name="view_data",methods={"GET"})
     * @param int $id
     * @return Response
     */
    public function viewRow(int $id): Response
    {
        $rep = $this->getDoctrine()->getRepository(SalesReps::class)->find($id);
        if (!$rep) {
            throw new NotFoundHttpException("User not found");
        } else {
            return $this->respond($rep);
        }
    }

    /**
     * @Route("/add",name="add_row",methods={"POST"})
     * @param Request $request
     * @return Response
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */

    public function create(Request $request): Response
    {
        $propertyAccessor = PropertyAccess::createPropertyAccessor();

        $form = $this->buildForm(SalesRepType::class);


        $form->handleRequest($request);

        if (!$form->isSubmitted() || !$form->isValid()) {
            return $this->respond($form, Response::HTTP_BAD_REQUEST);
        } else {
            /** @var SalesReps $salesReps */
            $salesReps = $form->getData();
            $rep = $this->getDoctrine()->getRepository(SalesReps::class)->findBy(['email' => $propertyAccessor->getValue($salesReps, 'email')]);
            if ($rep) {
                return $this->respond([
                    'type' => 'error',
                    'message' => 'This Email Address is already exit.'
                ],Response::HTTP_BAD_REQUEST);
            } else {
                $this->getDoctrine()->getManager()->persist($salesReps);
                $this->getDoctrine()->getManager()->flush();

                return $this->respond($salesReps);
            }

        }


//        $entityManager = $this->getDoctrine()->getManager();
//
//        $rep = new SalesReps();
//        $rep->setName();
//        $rep->setEmail();
//        $rep->setTelephone();
//        $rep->setRoute();
//        $rep->setJDate();
//        $rep->setComment();
//
//        $entityManager->persist($rep);
//
//        $entityManager->flush();

//        return new Response();
    }

    /**
     * @Route("/update/{id<\d+>}",name="update_eow",methods={"PUT"})
     * @param int $id
     * @param Request $request
     * @return Response
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function update(int $id, Request $request): Response
    {
        $rep = $this->getDoctrine()->getRepository(SalesReps::class)->find($id);
        if (!$rep) {
            throw new NotFoundHttpException("User not found");
        } else {


            $form = $this->buildForm(SalesRepType::class, $rep, [
                'method' => $request->getMethod(),
            ]);

            $form->handleRequest($request);

            if (!$form->isSubmitted() || !$form->isValid()) {
                return $this->respond($form, Response::HTTP_BAD_REQUEST);
            } else {
                /** @var SalesReps $salesReps */
                $salesReps = $form->getData();

                $this->getDoctrine()->getManager()->persist($salesReps);
                $this->getDoctrine()->getManager()->flush();

                return $this->respond($salesReps);

            }
        }
    }

    /**
     * @Route("/delete/{id<\d+>}",name="delete_row",methods={"DELETE"})
     * @param int $id
     * @return Response
     */
    public
    function delete(int $id): Response
    {
        $rep = $this->getDoctrine()->getRepository(SalesReps::class)->find($id);
        if (!$rep) {
            throw new NotFoundHttpException("User not found");
        } else {
            $this->getDoctrine()->getManager()->remove($rep);
            $this->getDoctrine()->getManager()->flush();
            return $this->json([
                'type' => 'success',
                'message' => 'User successfully removed'
            ]);
        }
    }

    /**
     * @Route("/getall",name="get_all_row",methods={"GET"})
     * @return Response
     */
    public
    function viewAll(): Response
    {
        $allReps = $this->getDoctrine()->getRepository(SalesReps::class)->findAll();

        return $this->respond($allReps);
    }
}
