<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class UserSearchController extends AbstractController
{
    private const FORBIDDEN_QUERIES = [
        'drop',
        'truncate',
        'delete',
        'update',
        'alter',
    ];

    /** @var NormalizerInterface */
    private $normalizer;

    public function __construct(NormalizerInterface $denormalizer)
    {
        $this->normalizer = $denormalizer;
    }

    /**
     * @Route("/api/search-user", methods={"GET"})
     */
    public function searchUser(Request $request): JsonResponse
    {
        $query = $request->query->get('query');

        foreach (self::FORBIDDEN_QUERIES as $forbiddenQuery) {
            if (false !== strpos(\strtolower($query), $forbiddenQuery)) {
                throw new BadRequestHttpException(sprintf('You are trying to %s the db, that is not nice :(', $forbiddenQuery));
            }
        }

        /** @var UserRepository $result */
        $repository = $this->getDoctrine()->getRepository(User::class);
        $result = $repository->dangerouslySearchByEmail($query);

        return new JsonResponse($result);
    }
}
