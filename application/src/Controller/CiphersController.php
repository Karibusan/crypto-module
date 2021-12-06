<?php
	
	namespace App\Controller;
	
	use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
	use Symfony\Component\HttpFoundation\Response;
	use Symfony\Component\Routing\Annotation\Route;
	
	class CiphersController extends AbstractController
	{
		/**
		 * @Route("/ciphers/caesar")
		 */
		public function caesar (): Response
		{
			return $this->render ( 'ciphers/caesar.html.twig' ,
				[
					'home_active' => '',
					'caesar_active' => 'active',
					'substitution_active' => '',
					'transposition_active' => ''
				] );
		}
		
		/**
		 * @Route("/ciphers/substitution")
		 */
		public function substitution (): Response
		{
			return $this->render ( 'ciphers/substitution.html.twig' ,
				[
					'home_active' => '',
					'caesar_active' => '',
					'substitution_active' => 'active',
					'transposition_active' => ''
				] );
		}
		
		/**
		 * @Route("/ciphers/transposition")
		 */
		public function transposition (): Response
		{
			return $this->render ( 'ciphers/transposition.html.twig' ,
				[
					'home_active' => '',
					'caesar_active' => '',
					'substitution_active' => '',
					'transposition_active' => 'active'
				] );
		}
	}