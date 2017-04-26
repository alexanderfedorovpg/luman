<?php

use Illuminate\Database\Seeder;

class GroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('groups')->insert([
            'name' => 'Администраторы',
            'enabled'=>'1',
        ]);
        DB::table('groups')->insert([
            'name' => 'Редакторы',
            'enabled'=>'1',
        ]);
        DB::table('groups')->insert([
            'name' => 'Выпускающий',
            'enabled'=>'1',
        ]);
        DB::table('groups')->insert([
            'name' => 'Практикант',
            'enabled'=>'1',
        ]);
    }
}
