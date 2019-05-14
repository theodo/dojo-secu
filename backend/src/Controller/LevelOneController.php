<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

class LevelOneController extends AbstractController
{
    /**
     * @Route("/api/level-one/level-up", methods={"PUT"})
     */
    public function levelUp(): JsonResponse
    {
        $em = $this->getDoctrine()->getManager();

        /** @var User $user */
        $user = $this->getUser();
        if (\in_array(User::ROLES['level_two'], $user->getRoles())) {
            throw new BadRequestHttpException('You have already been granted this role');
        }

        $user->addRole('level_two');
        $em->flush();

        return new JsonResponse($user->getRoles());
    }
}
