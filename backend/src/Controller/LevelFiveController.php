<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

class LevelFiveController extends AbstractController
{
    /**
     * @Route("/api/level-five/level-up", methods={"PUT"})
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
            throw new BadRequestHttpException('You need to be a commander to execute this action');
        }

        $requestContent = \json_decode((string) $request->getContent(), true);

        if (!\array_key_exists('access_code', $requestContent)) {
            throw new BadRequestHttpException('You must provide an access code');
        }

        $accessCode = $requestContent['access_code'];

        if ('code_provisoire' !== $accessCode) {
            throw new BadRequestHttpException('The access code you have entered is not valid');
        }

        $user->addRole('level_six');
        $em->flush();

        return new JsonResponse($user->getRoles());
    }
}
