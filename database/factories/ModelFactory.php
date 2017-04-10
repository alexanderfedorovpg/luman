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

$factory->define(App\News::class, function (Faker\Generator $faker) {
    return [
        'publish_date' => $faker->dateTime(),
        'is_publish'=> 1,
        'top'=> $faker->numberBetween(1,8),
        'title' => $faker->title,
        'sub_title'=>$faker->title,
        'note'=>$faker->text(100),
        'video_stream'=>'http://www.youtube.com',
        'body'=>$faker->realText(200),
        'keywords'=>'one two',
        'tags'=>'one,two',
        'editor_id'=>$faker->randomElement([2,3]),
        'image_main'=>$faker->imageUrl(),
        'image_preview'=>$faker->imageUrl(),
        'is_online'=>$faker->randomElement([0,1]),
        'is_war_mode'=>$faker->randomElement([0,1]),


    ];
});
