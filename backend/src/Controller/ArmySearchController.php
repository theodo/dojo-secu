<?php

namespace App\Controller;

use App\Entity\Soldier;
use App\Repository\SoldierRepository;
use Doctrine\ORM\EntityManagerInterface;
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

    /** @var EntityManagerInterface */
    private $em;

    public function __construct(NormalizerInterface $denormalizer, EntityManagerInterface $em)
    {
        $this->normalizer = $denormalizer;
        $this->em = $em;
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

        $RAW_QUERY = 'SELECT first_name, last_name, rank FROM army WHERE rank='.$rank.';';

        $statement = $this->em->getConnection()->prepare($RAW_QUERY);
        $statement->execute();

        // other way to do sql injection, the problem is that we couldn't execute
        // /** @var SoldierRepository $repository */
        // $repository = $this->getDoctrine()->getRepository(Soldier::class);
        // $result = $repository->dangerouslySearchByRank($rank);

        return new JsonResponse($statement->fetchAll());
    }
}
