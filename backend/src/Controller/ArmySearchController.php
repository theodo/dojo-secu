<?php

namespace App\Controller;

use App\Entity\Soldier;
use App\Repository\SoldierRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ArmySearchController extends AbstractController
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
     * @Route("/api/army", methods={"GET"})
     */
    public function searchArmy(Request $request): JsonResponse
    {
        $rank = $request->query->get('rank');

        foreach (self::FORBIDDEN_QUERIES as $forbiddenQuery) {
            if (false !== strpos(\strtolower($rank), $forbiddenQuery)) {
                throw new BadRequestHttpException(sprintf('You are trying to %s the db, that is not nice :(', $forbiddenQuery));
            }
        }

        /** @var SoldierRepository $repository */
        $repository = $this->getDoctrine()->getRepository(Soldier::class);
        $result = $repository->dangerouslySearchByRank($rank);

        return new JsonResponse($result);
    }
}
