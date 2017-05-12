<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableNews extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('publish_date')->nullable();
            $table->boolean('is_publish')->nullable();
            $table->addColumn('integer','top',['lenght' => 8]);
            $table->string('title',120);
            $table->string('sub_title',140);
            $table->text('note');
            $table->string('video_stream')->nullable();
            $table->binary('body');
            $table->string('keywords');
            $table->string('tags');
            $table->integer('editor_id')->unsigned()->nullable();
            $table->string('image_main');
            $table->string('image_preview');
            $table->boolean('is_online');
            $table->timestamps();


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('news');
    }
}
