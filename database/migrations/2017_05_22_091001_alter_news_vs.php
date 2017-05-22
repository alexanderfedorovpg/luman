<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterNewsVs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('news', function (Blueprint $table) {
            $table->integer('video_stream')->unsigned()->nullable()->change();
            $table->integer('video_stream_preview')->unsigned()->nullable()->change();


            $table->foreign('video_stream','new_video_stream_cdn')->references('id')->on('cdn_files')
                ->onDelete('set null')
                ->onUpdate('cascade');

            $table->foreign('video_stream_preview','new_video_stream_preview')->references('id')->on('cdn_files')
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
            //
        });
    }
}
