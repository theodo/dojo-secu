<?php

namespace App\Controller;

use App\Entity\Chat;
use App\Entity\Message;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

class LevelSixController extends AbstractController
{
    /**
     * @Route("/api/chat", methods={"GET"})
     */
    public function chatAction(): JsonResponse
    {
        $entityManager = $this->getDoctrine()->getManager();

        /** @var User $user */
        $user = $this->getUser();
        if (!\in_array(User::ROLES['level_six'], $user->getRoles())) {
            throw new BadRequestHttpException('You need to be an admiral to execute this action');
        }

        $messagesRepository = $entityManager->getRepository(Message::class);
        $messages = $messagesRepository->findByUser($user);

        return new JsonResponse($messages);
    }

    /**
     * @Route("/api/chat/{id}", methods={"GET"})
     */
    public function chatAdminAction($id): JsonResponse
    {
        $entityManager = $this->getDoctrine()->getManager();

        /** @var User $user */
        $user = $this->getUser();
        if (!\in_array(User::ROLES['level_seven'], $user->getRoles())) {
            throw new BadRequestHttpException('You need to be a supreme leader to execute this action');
        }

        $messagesRepository = $entityManager->getRepository(Message::class);
        $messages = $messagesRepository->findByChat($id);

        return new JsonResponse($messages);
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @throws \Exception
     * @Route("/api/messages", methods={"POST"})
     */
    public function addMessageAction(Request $request)
    {
        $requestContent = \json_decode((string) $request->getContent(), true);
        $messageText = $requestContent['text'];
        $user = $this->getUser();
        $entityManager = $this->getDoctrine()->getManager();
        $chatRepository = $entityManager->getRepository(Chat::class);
        /** @var Chat $chat */
        $chat = $chatRepository->findOneBy(['chatUser' => $user]);

        $message = new Message();
        $message->setAuthor($this->getUser());
        $message->setCreatedAt(new \DateTime());
        $message->setChat($chat);
        $message->setText($messageText);

        $entityManager->persist($message);
        $entityManager->flush();

        return new JsonResponse([], 204);
    }
}
