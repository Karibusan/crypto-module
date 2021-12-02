<?php
	namespace App\Controller;
	
	use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
	use Symfony\Component\HttpFoundation\Response;
	use Symfony\Component\Routing\Annotation\Route;
	
	class AppController extends AbstractController
	{
		/**
		 * @Route("/")
		 */
		public function number(): Response
		{
			return $this->render('layout.html.twig' ,
				[
					'home_active' => 'active',
					'caesar_active' => '',
					'substitution_active' => '',
					'transposition_active' => ''
				] );
		}
	}