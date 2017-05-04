<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropAirLiveColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('air_lives', function (Blueprint $table) {
            $table->dropColumn('to_homepage');
            $table->dropColumn('enabled_timer');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('air_lives', function (Blueprint $table) {
            $table->boolean('to_homepage')->default(false);
            $table->boolean('enabled_timer')->default(false);
        });
    }
}
