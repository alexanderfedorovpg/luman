<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterTableNewsCounters extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::rename('news_counters', 'counters');
        Schema::table('counters', function (Blueprint $table) {
            $table->string('type');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::rename('counters', 'news_counters');
        Schema::table('news_counters', function (Blueprint $table) {
            $table->dropColumn('type');
        });

    }
}
