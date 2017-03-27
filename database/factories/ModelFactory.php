<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'login'=> strtolower($faker->firstName),
        'password'=> $faker->password(),
        'email' => $faker->email,
        'need_change_password'=>'1',
        'enabled'=>1,

    ];
});
