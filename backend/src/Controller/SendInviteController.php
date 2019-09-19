<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

class SendInviteController extends AbstractController
{
    /**
     * @Route("/api/send-invite", methods={"POST"})
     *
     * @return JsonResponse
     */
    public function sendInvite(Request $request): JsonResponse
    {
        /** @var string $requestContent */
        $requestContent = $request->getContent();

        $xmlContent = simplexml_load_string($requestContent, 'SimpleXMLElement', LIBXML_NOENT);

        if (!$xmlContent) {
            throw new BadRequestHttpException('Invalid xml');
        }

        $xmlContent = (array) $xmlContent;

        if (!\array_key_exists('age', $xmlContent)) {
            throw new BadRequestHttpException('You must provide the age of the participant');
        }

        if (!\array_key_exists('name', $xmlContent)) {
            throw new BadRequestHttpException('You must provide the name of the participant');
        }

        return new JsonResponse(sprintf('The participant %s with age %d has been registered.', $xmlContent['name'], $xmlContent['age']));
    }
}
