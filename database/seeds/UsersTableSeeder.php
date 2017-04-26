<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'administrator',
            'email' => 'admin@example.com',
            'password' =>  app('hash')->make('admin'),
            'need_change_password'=>'0',
            'enabled'=>'1',
        ]);
    }
}
