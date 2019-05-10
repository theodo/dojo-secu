<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

class UserSearchController extends AbstractController
{
    private const FORBIDDEN_QUERIES = [
        'drop',
        'truncate',
        'delete',
        'update',
        'alter',
    ];

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

        foreach (self::FORBIDDEN_QUERIES as $forbiddenQuery) {
            if(strpos( \strToLower($query), $forbiddenQuery ) !== false) {
                throw new BadRequestHttpException(sprintf('You are trying to %s the db, that is not nice :(', $forbiddenQuery));
            }
        }

        $RAW_QUERY = "SELECT * FROM app_users WHERE email='".$query."';";

        $statement = $this->em->getConnection()->prepare($RAW_QUERY);
        $statement->execute();

        return new JsonResponse($statement->fetchAll());
    }
}
