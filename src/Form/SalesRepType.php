<?php

namespace App\Form;

use App\Entity\SalesReps;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotNull;

class SalesRepType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('id')
            ->add('name', TextType::class, [
                'constraints' => [
                    new NotBlank([
                        "message" => "Name can not be Blank"
                    ]),
                    new NotNull([
                        'message' => 'Name can not be Null'
                    ])
                ]
            ])
            ->add('email', EmailType::class, [
                'constraints' => [
                    new NotNull([
                        'message' => 'Email can not be Null'
                    ]),
                    new NotBlank([
                        "message" => "Email can not be Blank"
                    ]),
                    new Email([
                        'message' => 'Email Address is Not valid'
                    ])
                ]
            ])
            ->add('telephone', TextType::class, [
                'constraints' => [
                    new NotBlank([
                        "message" => "Telephone Number can not be Blank"
                    ]),
                    new NotNull([
                        'message' => 'Telephone Number can not be Null'
                    ]),
                    new Length([
                        'min' => 10,
                        "max" => 10,
                    ])
                ]
            ])
            ->add('route', TextType::class, [
                'constraints' => [
                    new NotBlank([
                        "message" => "Current Route can not be Blank"
                    ]),
                    new NotNull([
                        'message' => 'Current Route can not be Null'
                    ])
                ]
            ])
            ->add('joinedDate', DateType::class, [
                'widget' => 'single_text',
                'html5' => false,
                'format' => 'yyyy-MM-dd',
                'constraints' => [
                    new NotBlank([
                        "message" => "Join Date can not be Blank"
                    ]),
                    new NotNull([
                        'message' => 'Join Date can not be Null'
                    ]),
                    new Date([
                        'message' => 'Join Date is Not Valid'

                    ])
                ]
            ])
            ->add('comment', TextType::class);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => SalesReps::class,
        ]);
    }
}
