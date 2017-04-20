<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterNewsImageColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return voids
     */
    public function up()
    {
        Schema::table('news', function (Blueprint $table) {
            $table->dropColumn('image_main');
            $table->dropColumn('image_preview');
            $table->dropColumn('video_stream');
        });

        Schema::table('news', function (Blueprint $table) {
            $table->integer('image_main')->unsigned()->nullable();
            $table->integer('image_preview')->unsigned()->nullable();
            $table->string('video_stream')->nullable();

            $table->foreign('image_main')->references('id')->on('cdn_files')
                ->onDelete('set null')
                ->onUpdate('cascade');

            $table->foreign('image_preview')->references('id')->on('cdn_files')
                ->onDelete('set null')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('news', function (Blueprint $table) {
            $table->string('video_stream')->nullable();
            $table->string('image_main');
            $table->string('image_preview');
        });
    }
}
