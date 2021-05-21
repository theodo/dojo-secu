<?php

namespace App\Controller;

use App\Entity\Soldier;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

class LevelThreeController extends AbstractController
{
    /**
     * @Route("/api/level-three/level-up", methods={"PUT"})
     */
    public function levelUp(Request $request): JsonResponse
    {
        $em = $this->getDoctrine()->getManager();

        /** @var User $user */
        $user = $this->getUser();
        if (\in_array(User::ROLES['level_four'], $user->getRoles())) {
            throw new BadRequestHttpException('You have already been granted this role');
        }

        if (!\in_array(User::ROLES['level_three'], $user->getRoles())) {
            throw new BadRequestHttpException('You need to be a squad leader to execute this action');
        }

        $requestContent = \json_decode((string) $request->getContent(), true);

        if (!\array_key_exists('access_code', $requestContent)) {
            throw new BadRequestHttpException('You must provide an access code');
        }

        $accessCode = $requestContent['access_code'];
        $soldiersRepository = $em->getRepository(Soldier::class);

        if (null === $soldiersRepository->findOneBy(['accessCode' => $accessCode])) {
            throw new BadRequestHttpException('The access code that you have entered is not valid.');
        }

        $user->addRole('level_four');
        $em->flush();

        return new JsonResponse($user->getRoles());
    }
}
