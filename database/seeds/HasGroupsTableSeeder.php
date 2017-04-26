<?php

use Illuminate\Database\Seeder;

class HasGroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user=App\Models\User::firstOrFail();
        $group=App\Models\Groups::firstOrFail();

        DB::table('has_groups')->insert([
            'user_id' => $user->id,
            'group_id'=> $group->id,
        ]);

    }
}
