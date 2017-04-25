<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHomepageOptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('homepage_options', function (Blueprint $table) {
            $table->string('name')->unique();
            $table->string('value');
        });

        DB::table('homepage_options')->insert([
            'name' => 'is_war_mode',
            'value' => '0',
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('homepage_options');
    }
}
