<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterHomepageTablesColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('homepage_info_noise', function (Blueprint $table) {
            $table->integer('top')->default(1);
        });

        Schema::table('homepage_news', function (Blueprint $table) {
            $table->integer('top')->default(1);
        });

        Schema::table('homepage_records', function (Blueprint $table) {
            $table->integer('top')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('homepage_info_noise', function (Blueprint $table) {
            $table->dropColumn('top');
        });

        Schema::table('homepage_news', function (Blueprint $table) {
            $table->dropColumn('top');
        });

        Schema::table('homepage_records', function (Blueprint $table) {
            $table->dropColumn('top');
        });
    }
}
