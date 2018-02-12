<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact', function(Blueprint $table) {
            $table->increments('id');
            $table->string('images', 255)->nullable();
            $table->string('name', 255);
            $table->string('position', 255);
            $table->string('phone')->nullable();
            $table->string('fax', 50)->nullable();
            $table->text('email');
            $table->text('adrress');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contact');
    }
}
