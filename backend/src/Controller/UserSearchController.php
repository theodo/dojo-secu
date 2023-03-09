<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

class UserSearchController extends AbstractController
{
    /** @var EntityManagerInterface */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @Route("/api/search-user", methods={"GET"})
     */
    public function searchUser(Request $request): JsonResponse
    {
        $query = $request->query->get('query');

        if(strpos( \strToLower($query), 'drop' ) !== false) {
            throw new BadRequestHttpException('You are trying to drop the db, that is not nice :(');
        }

        if(strpos( \strToLower($query), 'truncate' ) !== false) {
            throw new BadRequestHttpException('You are trying to truncate the db, that is not nice :(');
        }

        $users = $this->getDoctrine()
            ->getRepository(User::class)
            ->searchUsers($query);

        return new JsonResponse($users);
    }
}
