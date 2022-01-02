<?php

namespace App\Controller;

use App\Entity\SalesReps;
use App\Repository\SalesRepsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api/team", name="team_api.")
 */
class CrudController extends AbstractApiController
{
    /**
     * @var \App\Repository\SalesRepsRepository
     */
    private $salesRepsRepository;
    /**
     * @var \Doctrine\ORM\EntityManagerInterface
     */
    private $entityManager;
    /**
     * @var \Symfony\Component\Validator\Validator\ValidatorInterface
     */
    private $validator;

    /**
     * @param \App\Repository\SalesRepsRepository $salesRepsRepository
     * @param \Doctrine\ORM\EntityManagerInterface $entityManager
     * @param \Symfony\Component\Validator\Validator\ValidatorInterface $validator
     */
    public function __construct(SalesRepsRepository $salesRepsRepository, EntityManagerInterface $entityManager, validatorinterface $validator)
    {
        $this->salesRepsRepository = $salesRepsRepository;
        $this->entityManager = $entityManager;
        $this->validator = $validator;
    }


    /**
     * @Route("/view/{id<\d+>}", name="view_data",methods={"GET"})
     * @param int $id
     * @return Response
     */
    public function viewRow(int $id): Response
    {
        $rep = $this->salesRepsRepository->find($id);
        if (!$rep) {
            return $this->respond([
                'type' => 'error',
                'msg' => 'There is no any user exit with this ID.'
            ], Response::HTTP_NOT_FOUND);
        } else {
            return $this->respond($rep);
        }
    }

    /**
     * @Route("/add",name="add_row",methods={"POST"})
     * @param Request $request
     * @return Response
     */

    public function create(Request $request): Response
    {

        $salesReps = json_decode($request->getContent(), true);

        if ($salesReps) {
            $newSaleRep = new SalesReps($salesReps['name'], $salesReps['email'], $salesReps['telephone'], $salesReps['route'], date_create($salesReps['joinedDate']), $salesReps['comment']);
            $errors = $this->validator->validate($newSaleRep);
            if (!(count($errors) > 0)) {
                /** @var SalesReps $salesReps */
                $rep = $this->salesRepsRepository->findBy(['email' => $salesReps['email']]);

                if ($rep) {
                    return $this->respond([
                        'type' => 'error',
                        'message' => 'This Email Address is already exit.',
                    ], Response::HTTP_ALREADY_REPORTED);
                } else {
                    $this->entityManager->persist($newSaleRep);
                    $this->entityManager->flush();

                    return $this->respond($newSaleRep);
                }
            } else {
                return $this->respond([
                    'type' => 'error',
                    'msg' => 'Your details are invalid.',
                    'data' => $errors
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
        } else {
            return $this->respond([
                'type' => 'error',
                'msg' => 'no data'
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * @Route("/update/{id<\d+>}",name="update_eow",methods={"PUT"})
     * @param int $id
     * @param Request $request
     * @return Response
     */
    public function update(int $id, Request $request): Response
    {
        $rep = $this->salesRepsRepository->find($id);
        $salesReps = json_decode($request->getContent(), true);

        if (!$rep) {
            return $this->respond([
                'type' => 'error',
                'msg' => 'There is no any user exit with this ID.'
            ], Response::HTTP_NOT_FOUND);
        } else {
            if ($salesReps) {

                $rep->setName($salesReps['name']);
                $rep->setEmail($salesReps['email']);
                $rep->setRoute($salesReps['route']);
                $rep->setTelephone($salesReps['telephone']);
                $rep->setJoinedDate(date_create($salesReps['joinedDate']));
                $rep->setComment($salesReps['comment']);

                $errors = $this->validator->validate($rep);

                if (!(count($errors) > 0)) {
                    $oldRep = $this->salesRepsRepository->findBy(['email' => $salesReps['email']]);

                    if ($oldRep && !($oldRep[0]->getId() === $rep->getId())) {
                        return $this->respond([
                            'type' => 'error',
                            'message' => 'This Email Address is already exit.',
                        ], Response::HTTP_ALREADY_REPORTED);
                    } else {
                        /** @var SalesReps $salesReps */

                        $this->entityManager->persist($rep);
                        $this->entityManager->flush();

                        return $this->respond($rep);
                    }
                } else {
                    return $this->respond([
                        'type' => 'error',
                        'msg' => 'Your details are invalid.',
                        'data' => $errors
                    ], Response::HTTP_UNPROCESSABLE_ENTITY);
                }
            } else {
                return $this->respond([
                    'type' => 'error',
                    'msg' => 'no data'
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
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
        $rep = $this->salesRepsRepository->find($id);
        if (!$rep) {
            return $this->respond([
                'type' => 'error',
                'msg' => 'There is no any user exit with this ID.'
            ], Response::HTTP_NOT_FOUND);
        } else {
            $this->entityManager->remove($rep);
            $this->entityManager->flush();
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
        $allReps = $this->salesRepsRepository->findAll();

        return $this->respond($allReps);
    }
}
