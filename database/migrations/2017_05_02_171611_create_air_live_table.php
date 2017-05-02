<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAirLiveTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('air_lives', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('news_id')->unsigned();
            $table->text('stream_url');
            $table->text('image_preview');
            $table->string('title');
            $table->string('comment')->nullable();
            $table->boolean('to_homepage')->default(false);
            $table->boolean('enabled_timer')->default(false);
            $table->boolean('enabled_live')->default(false);
            $table->timestamps();

            $table->foreign('news_id')->references('id')->on('news')
                ->onDelete('cascade')
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
        Schema::dropIfExists('air_lives');
    }
}
