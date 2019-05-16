<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

class LevelTwoController extends AbstractController
{
    /**
     * @Route("/api/level-two/level-up", methods={"PUT"})
     */
    public function levelUp(Request $request): JsonResponse
    {
        $em = $this->getDoctrine()->getManager();

        /** @var User $user */
        $user = $this->getUser();
        if (\in_array(User::ROLES['level_three'], $user->getRoles())) {
            throw new BadRequestHttpException('You have already been granted this role');
        }

        $status = $request->query->get('i_am_squad_leader');

        if (!\in_array(User::ROLES['level_two'], $user->getRoles()) || 'true' !== $status) {
            throw new BadRequestHttpException('You need to prove that you are a squad leader to execute this action');
        }

        $user->addRole('level_three');
        $em->flush();

        return new JsonResponse($user->getRoles());
    }
}
