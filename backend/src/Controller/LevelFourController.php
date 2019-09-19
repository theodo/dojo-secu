<?php

namespace App\Controller;

use App\Entity\Soldier;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\Argon2iPasswordEncoder;

class LevelFourController extends AbstractController
{
    /** @var Argon2iPasswordEncoder */
    private $encoder;

    public function __construct(Argon2iPasswordEncoder $encoder)
    {
        $this->encoder = $encoder;
    }

    /**
     * @Route("/api/level-four/level-up", methods={"PUT"})
     */
    public function levelUp(Request $request): JsonResponse
    {
        $em = $this->getDoctrine()->getManager();

        /** @var User $user */
        $user = $this->getUser();
        if (\in_array(User::ROLES['level_five'], $user->getRoles())) {
            throw new BadRequestHttpException('You have already been granted this role');
        }

        if (!\in_array(User::ROLES['level_four'], $user->getRoles())) {
            throw new BadRequestHttpException('You need to be a corporal to execute this action');
        }

        $requestContent = \json_decode($request->getContent(), 'json');

        if (!\array_key_exists('access_code', $requestContent)) {
            throw new BadRequestHttpException('You must provide an access code');
        }

        $accessCode = $requestContent['access_code'];

        $soldiersRepository = $em->getRepository(Soldier::class);

        /** @var Soldier $commander */
        $commander = $soldiersRepository->findOneBy(['rank' => 'commander']);

        if (!$this->encoder->isPasswordValid($commander->getAccessCode(), $accessCode, null)) {
            throw new BadRequestHttpException('The access code you have entered is not valid');
        }

        $user->addRole('level_five');
        $em->flush();

        return new JsonResponse($user->getRoles());
    }
}
